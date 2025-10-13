"use client";

import React, { useEffect, useRef, useState } from "react";
import Rating from "@mui/material/Rating";

type Review = {
  reviewerName?: string;
  reviewerEmail?: string;
  rating: number;
  comment: string;
  date: string;
  anonymous?: boolean;
};

export default function ReviewsClient({
  initialReviews,
}: {
  initialReviews?: Review[];
}) {
  // Keep reviews in local state. We prepend new reviews here.
  const [reviews, setReviews] = useState<Review[]>(() =>
    initialReviews ? [...initialReviews] : []
  );
  // Show only up to 3 in UI
  const VISIBLE_COUNT = 3;

  // Form fields
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState<number | null>(2);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [anon, setAnon] = useState(false);

  // animation: control maxHeight on content wrapper
  const contentRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // initialize reviews if server passed plain objects without createdAt
    if (initialReviews && initialReviews.length && reviews.length === 0) {
      setReviews(
        initialReviews.map((r, i) => ({
          reviewerName:
            (r as any).reviewerName ?? (r as any).user ?? "Anonymous",
          reviewerEmail: (r as any).reviewerEmail ?? "",
          rating: (r as any).rating ?? 5,
          comment: (r as any).comment ?? (r as any).body ?? "",
          date: (r as any).date ?? new Date().toISOString(),
          anonymous: false,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // adjust maxHeight for smooth expand/collapse
  useEffect(() => {
    const el = wrapperRef.current;
    const inner = contentRef.current;
    if (!el || !inner) return;

    if (expanded) {
      // expand: set maxHeight to the inner scrollHeight
      el.style.maxHeight = `${inner.scrollHeight}px`;
      el.style.opacity = "1";
    } else {
      // collapse
      el.style.maxHeight = "0px";
      el.style.opacity = "0";
    }
  }, [expanded]);

  function toggleExpand() {
    setExpanded((s) => !s);
    // when expanding, focus the textarea a tick later
    if (!expanded) {
      setTimeout(() => {
        const ta = contentRef.current?.querySelector(
          "textarea"
        ) as HTMLTextAreaElement | null;
        ta?.focus();
      }, 350);
    }
  }

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    // Basic validation
    if (!comment.trim()) {
      // optionally show an error toast
      return;
    }

    const newReview: Review = {
      reviewerName: anon ? "Anonymous" : reviewerName || "Anonymous",
      reviewerEmail: anon ? "" : reviewerEmail || "",
      rating: rating ?? 0,
      comment: comment.trim(),
      date: new Date().toISOString(),
      anonymous: anon,
    };

    // Prepend and keep only the latest VISIBLE_COUNT reviews + optionally keep more in memory
    setReviews((prev) => [newReview, ...(prev ?? [])]);
    // Clear form
    setRating(2);
    setComment("");
    setReviewerName("");
    setReviewerEmail("");
    setAnon(false);

    // keep form open or collapse if you want:
    setExpanded(false);
  }

  // Only show up to VISIBLE_COUNT reviews in the UI
  const visibleReviews = reviews.slice(0, VISIBLE_COUNT);

  return (
    <div className="w-full">
      {/* Reviews header */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>

        {/* Reviews list */}
        <div className="flex flex-col gap-4">
          {visibleReviews.length === 0 && (
            <div className="text-sm text-gray-600">
              No reviews yet — be the first to write one.
            </div>
          )}

          {visibleReviews.map((r, indx) => (
            <div key={indx} className="p-3 border rounded-md bg-white/90">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium">
                    {r.anonymous ? "Anonymous" : r.reviewerName}
                  </div>
                  <Rating
                    name={`read-${indx}`}
                    value={r.rating}
                    readOnly
                    size="small"
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(r.date).toLocaleString()}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-800">{r.comment}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review button */}
      <div className="mt-4">
        <button
          onClick={toggleExpand}
          className="block text-center py-2 text-white bg-black w-full rounded"
        >
          {expanded ? "Cancel" : "Write Review"}
        </button>
      </div>

      {/* Animated form wrapper: controlled by inline style maxHeight (transition) */}
      <div
        ref={wrapperRef}
        style={{
          maxHeight: "0px",
          overflow: "hidden",
          transition: "max-height 350ms ease, opacity 250ms ease",
          opacity: 0,
        }}
        className="mt-3"
        aria-hidden={!expanded}
      >
        <div ref={contentRef} className="p-4 border rounded-md bg-white/95">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Rating
              </label>
              <Rating
                name="write-rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full min-h-[100px] p-2 border rounded outline-none focus:ring-2 focus:ring-black/30"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-black/30"
                  disabled={anon}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  value={reviewerEmail}
                  onChange={(e) => setReviewerEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-black/30"
                  disabled={anon}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="anon"
                type="checkbox"
                checked={anon}
                onChange={(e) => setAnon(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="anon" className="text-sm">
                Submit anonymously
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:opacity-95"
              >
                Submit Review
              </button>

              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                }}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
