import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Pagination({
  total,
  interval,
  slug,
  skip,
  query,
}: {
  total: number;
  interval: number;
  slug?: string;
  skip?: number;
  query?: string;
}) {
  const currentIndx = skip ? Math.ceil(skip / interval) + 1 : 1;
  const rightEnd = Math.ceil(total / interval);
  const leftEnd = 1;
  function checkLeft(num: number) {
    if (num <= leftEnd) return undefined;
    else return num;
  }

  function checkRight(num: number): number | undefined {
    if (num >= rightEnd) return undefined;
    else return num;
  }

  for (let i = currentIndx - 2; i <= currentIndx; i++) {}

  const constructPagination = [
    1,
    checkLeft(currentIndx - 3) === undefined ? undefined : "...",
    checkLeft(currentIndx - 2),
    checkLeft(currentIndx - 1),
    checkLeft(currentIndx),
    checkRight(currentIndx + 1),
    checkRight(currentIndx + 2),
    checkRight(currentIndx + 3) === undefined ? undefined : "...",
    rightEnd === leftEnd || rightEnd === currentIndx ? undefined : rightEnd,
  ];

  const paginationArray = constructPagination.filter(
    (element) => element !== undefined
  );
  const href = slug ? `/category/${slug}?` : `/search?q=${query}&`;
  return (
    <div className="flex justify-center items-center gap-8 mb-14">
      {currentIndx !== 1 && (
        <Link
          href={`${href}skip=${skip ? skip - interval : 0}`}
          className="text-xl"
        >
          {<MdOutlineKeyboardArrowLeft />}
        </Link>
      )}
      {paginationArray.map((elem, i) => {
        return elem === "..." ? (
          <div key={i} className="px-2">
            {elem}
          </div>
        ) : (
          <Link
            href={`${href}skip=${(Number(elem) - 1) * interval}`}
            key={i}
            className={`px-2 text-sm ${
              currentIndx === elem
                ? "shadow-[0_2px_black]"
                : "hover:shadow-[0_2px_black]"
            }`}
          >
            {elem}
          </Link>
        );
      })}
      {currentIndx != Math.ceil(total / interval) && (
        <Link
          href={`${href}skip=${skip ? skip + interval : 0}`}
          className="text-xl"
        >
          {<MdOutlineKeyboardArrowRight />}
        </Link>
      )}
    </div>
  );
}

export default Pagination;
