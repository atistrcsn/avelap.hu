"use client";

import { AveConfig } from "@/app/app-config";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { default as RcPagination } from "rc-pagination";
import "rc-pagination/assets/index.css";
import { FC, ReactNode, useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa6";

interface PaginationProps {
  /**
   * The total number of pages
   */
  total: number;
  /**
   * An array of page size numbers
   */
  sizes?: number[];
  /**
   * Label for the page size dropdown
   */
  perPageText?: string;
  /**
   * Label for the invisible page size button
   */
  setPageSizeText?: string;
  /**
   * Extra props to pass to the next.js links
   */
  linkProps?: { [key: string]: any };
  /**
   * Scrolling to top is enabled
   */
  isScrollToTopEnabled?: boolean;
}

interface SelectProps {
  children: React.ReactNode;
  [key: string]: any;
}

const Select = ({ children, ...props }: SelectProps) => (
  <div>
    <select {...props}>{children}</select>
    <span>
      <FaRegCommentDots />
    </span>
  </div>
);

const defaultPaginationSizes = AveConfig.pagination.sizes;

export const Pagination: FC<PaginationProps> = ({
  total = 0,
  perPageText = "per page",
  setPageSizeText = "Beállítás",
  sizes = defaultPaginationSizes,
  linkProps = {},
  isScrollToTopEnabled = false,
}) => {
  const searchParams = useSearchParams();
  // const path = usePathname();
  const router = useRouter();
  const [hasRouter, setHasRouter] = useState(false);
  useEffect(() => {
    setHasRouter(true);
  }, [router]);

  if (!hasRouter) return null;
  const query = Object.fromEntries(
    [...searchParams.entries()].filter(([, v]) => v !== "" && v != null)
  );
  const currentPage = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("size")) || sizes[0];

  const url = (page: number | string) =>
    `?${queryString.stringify({
      ...query,
      page,
    })}`;

  const itemRender = (current: number, type: string, element: ReactNode) => {
    if (type === "page") {
      return (
        <Link
          legacyBehavior
          scroll={isScrollToTopEnabled}
          href={url(current)}
          {...linkProps}
        >
          {element}
        </Link>
      );
    }

    return (
      <Link
        legacyBehavior
        scroll={isScrollToTopEnabled}
        href={url(current)}
        {...linkProps}
      >
        {element}
      </Link>
    );
  };

  return (
    <>
      <RcPagination
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} a(z) ${total} elemből`
        }
        total={total}
        hideOnSinglePage={true}
        locale={{ page: "Oldal", prev_page: "Előző oldal" }}
        itemRender={itemRender}
        align="center"
        defaultPageSize={pageSize}
        defaultCurrent={currentPage}
        onChange={(page, pageSize) => {}}
        // prevIcon={(pagProps) => <FaRegArrowAltCircleLeft />}
        // nextIcon={<FaRegArrowAltCircleRight />}
        className="flex flex-row my-10! items-baseline"
      />
      {/* <form method="GET" action="">
        <input type="hidden" name="page" value={currentPage} />
        <div className="flex flex-row items-baseline gap-3">
          <label htmlFor="next-pagination__size">{perPageText}</label>
          <Select
            key={pageSize}
            name="size"
            id="next-pagination__size"
            defaultValue={pageSize}
            // onChange={(event: Event) => {
            //   const url = `${path}?${queryString.stringify({
            //     ...searchParams.entries(),
            //     page: 1,
            //     size: (event.target as HTMLSelectElement).value,
            //   })}`;
            //   router.push(url);
            // }}
          >
            {sizes.map((size) => (
              <option key={size}>{size}</option>
            ))}
          </Select>
          <button type="submit">{setPageSizeText}</button>
        </div>
      </form> */}
    </>
  );
};
