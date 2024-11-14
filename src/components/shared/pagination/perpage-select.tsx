import { nanoid } from "nanoid";

type PaginationSelectProps = {
  totalCount: number;
  onPerPageChange: (page: number) => void;
  perPage: number;
};

export const PerPageSelect = ({
  onPerPageChange,
  totalCount,
  perPage,
}: PaginationSelectProps) => {
  const options = [5, 10, 15, 20, 30, 40, 50, 100, totalCount];

  const uniqueOptions = options.filter(
    (item, index, array) => array.indexOf(item) === index,
  );

  const selectedItem =
    uniqueOptions.includes(perPage) && perPage <= totalCount
      ? perPage
      : totalCount;

  return (
    <select
      className="cursor-pointer rounded bg-background px-2 py-1 hover:bg-primary hover:text-primary-foreground hover:opacity-80"
      onChange={(event) => onPerPageChange(Number(event.target.value))}
      value={selectedItem}
    >
      {uniqueOptions.map(
        (option) =>
          option <= totalCount && (
            <option key={nanoid()} value={option}>
              {option}
            </option>
          ),
      )}
    </select>
  );
};
