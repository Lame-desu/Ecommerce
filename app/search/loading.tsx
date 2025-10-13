import LinearLoading from "@/components/server/LinearLoading";

function Loading() {
  return (
    <div className="h-56 flex flex-col justify-center items-center">
      <div className="w-[75vw]">
        <LinearLoading />
      </div>
    </div>
  );
}

export default Loading;
