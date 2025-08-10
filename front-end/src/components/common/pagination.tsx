import React from "react";

const Pagination = ({
  handleNext,
  handlePrev,
  handleChangePage,
  totalPagesCount,
  appliedQueries,
}: any) => {
  const page = parseInt(appliedQueries.page);
  return (
    <>
      {totalPagesCount ? (
        <div className="pagination flex flex-row justify-between">
          <button onClick={handleNext}>Next</button>
          <div className="flex flex-row-reverse">
            {Array.from({ length: totalPagesCount }, (_, index) => {
              if (
                (index + 1 <= page + 1 && index + 1 >= page - 1) ||
                index + 1 === 1 ||
                index + 1 === totalPagesCount
              ) {
                //شماره های بعدی
                return (
                  <React.Fragment key={index}>
                    {index + 1 === page - 1 && index + 1 > 2 ? "..." : null}
                    <button
                      className={`border rounded-md w-[30px] h-[30px] flex items-center justify-center ${
                        page === index + 1 ? "bg-amber-400" : null
                      }`}
                      onClick={() => {
                        handleChangePage(index + 1);
                      }}
                    >
                      {index + 1}
                    </button>
                    {index + 1 === page + 1 && index + 1 <= totalPagesCount - 2
                      ? "..."
                      : null}
                  </React.Fragment>
                );
              }
            })}
          </div>
          <button onClick={handlePrev}>Prev</button>
        </div>
      ) : (
        <div>محتوایی یافت نشد</div>
      )}
    </>
  );
};

export default Pagination;
