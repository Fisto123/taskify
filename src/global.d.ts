// global.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    /** Lynx <view> */
    view: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > & {
      ontap?: (e?: any) => void;
    };

    /** Lynx <text> */
    text: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLSpanElement>,
      HTMLSpanElement
    >;

    /** Lynx <input> */
    input: React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > & {
      bindinput?: (e: any) => void;
      ontap?: (e: any) => void; // in case Lynx input also fires tap
    };
  }
}
