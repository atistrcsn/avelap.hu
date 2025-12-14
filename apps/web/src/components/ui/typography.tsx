import { cn } from "@/utils";

export enum SubHeadingType {
  H2,
  H3,
  H4,
}

type Props = React.HTMLAttributes<HTMLElement> & {
  type: SubHeadingType;
  children?: React.ReactNode;
};

export const SubHeading: React.FC<Props> = ({ type, children, ...props }) => (
  <h3
    className={cn(
      "flex flex-row items-center gap-1 font-medium text-xl font-ibmplexserif leading-tight text-ave-gold-400-base mb-2",
      {
        "text-3xl font-playfairdisplay text-ave-blue mb-6 mt-12 leading-tight":
          type == SubHeadingType.H2,
        "text-xl uppercase mt-6": type == SubHeadingType.H3,
        "text-lg uppercase": type == SubHeadingType.H4,
      }
    )}
    {...props}
  >
    {children}
  </h3>
);
