"use client";
import Rating from "@mui/material/Rating";
import clsx from "clsx";
import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

function ShowReviews({ reviews }: { reviews: Review[] }) {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number>(2);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [displayReviews, setDisplayReviews] = useState(() =>
    reviews.slice(0, 3)
  );
  const contentRef = useRef<null | HTMLFormElement>(null);
  function submitReview(e: React.SyntheticEvent) {
    e.preventDefault();
    const target: HTMLFormElement = e.target as HTMLFormElement;
    const newReview: Review = {
      rating: ratingValue,
      comment: target.review.value,
      date: new Date().toLocaleString("en-US"),
      reviewerName: isAnonymous ? "anonymous" : target.reviewerName.value,
      reviewerEmail: isAnonymous
        ? "anonymous@ann.com"
        : target.reviewerEmail.value,
    };
    setDisplayReviews((prev) => {
      const prevReviews = prev.slice(0, 2);
      return [newReview, ...prevReviews];
    });
    target.reset();
    setRatingValue(2);
  }
  return (
    <div className="space-y-8">
      <button
        onClick={() => {
          setIsWriting((prev) => !prev);
          setRatingValue(2);
          setIsAnonymous(false);
        }}
        className="block text-center py-2 text-white bg-black w-full rounded"
      >
        {isWriting ? "Cancel" : "Write Review"}
      </button>
      <div
        style={{
          transition: "height 1s, opacity 500ms",
          opacity: isWriting ? "100%" : "0%",
          height: isWriting ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className={clsx()}
      >
        <form action="" onSubmit={submitReview} ref={contentRef}>
          <div className="p-4 border-[1px] border-gray-500 space-y-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold">Your Rating</p>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(Number(newValue));
                }}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="review" className="text-sm font-semibold">
                Review
              </label>
              <textarea
                name="review"
                id="review"
                placeholder="write your review"
                rows={3}
                className="w-full p-2 rounded-xs border-[0.5px] border-gray-500"
                disabled={!isWriting}
                required
              />
            </div>
            <div className="space-y-1">
              <div className="flex flex-col ga0-1">
                <label
                  className={`${
                    isAnonymous ? "text-gray-500" : "font-semibold"
                  }`}
                  htmlFor="reviewerName"
                >
                  Name
                </label>
                <input
                  className={`py-2 px-1 rounded-xs border-[0.5px] border-gray-500 ${
                    isAnonymous ? "cursor-not-allowed" : ""
                  }`}
                  type="text"
                  name="reviewerName"
                  disabled={isAnonymous || !isWriting}
                  required
                />
              </div>
              <div className="flex flex-col ga0-1">
                <label
                  className={`${
                    isAnonymous ? "text-gray-500" : "font-semibold"
                  }`}
                  htmlFor="reviewerEmail"
                >
                  Email
                </label>
                <input
                  className={`py-2 px-1 rounded-xs border-[0.5px] border-gray-500 ${
                    isAnonymous ? "cursor-not-allowed" : ""
                  }`}
                  type="email"
                  name="reviewerEmail"
                  disabled={isAnonymous || !isWriting}
                  required
                />
              </div>
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  value="anonymous"
                  name="anonymous"
                  onClick={(e) => {
                    setIsAnonymous(e.currentTarget.checked);
                  }}
                  disabled={!isWriting}
                />
                <label htmlFor="anonymous">Submit anonymously</label>
              </div>
            </div>
            <div className="flex gap-1 justify-center items-center">
              <button
                type="submit"
                className="flex-1 text-white bg-black hover:bg-gray-900 p-2 rounded-xs hover:shadow-lg cursor-pointer"
              >
                Submit Review
              </button>
              <button
                onClick={() => {
                  setIsWriting((prev) => !prev);
                  setRatingValue(2);
                  setIsAnonymous(false);
                }}
                className="flex-1 border-[1px] border-gray-500 hover:ring p-2 rounded-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>{" "}
      </div>

      {displayReviews.map((review, indx) => (
        <div
          className="space-y-4 pb-8 border-b-[1px] border-b-gray-400"
          key={indx}
        >
          <div className="space-y-2">
            <Rating
              name="read-only"
              value={review.rating}
              precision={0.1}
              readOnly
            />

            <h3 className="font-semibold">{review.comment}</h3>
            <p className="text-xs font-light">
              {new Date(review.date).toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className=" text-2xl">
              <CgProfile />
            </div>
            <div>
              <p className="text-lg font-medium">{review.reviewerName}</p>
              <p className="text-xs font-light">{review.reviewerEmail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowReviews;
