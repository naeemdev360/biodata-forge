declare module 'html-to-docx' {
  interface DocumentOptions {
    orientation?: 'portrait' | 'landscape';
    margins?: { top?: number; right?: number; bottom?: number; left?: number; header?: number; footer?: number; gutter?: number };
    pageSize?: { width?: number; height?: number };
    pageNumber?: boolean;
    font?: string;
    fontSize?: number;
    title?: string;
    subject?: string;
    creator?: string;
    description?: string;
  }

  function HTMLtoDOCX(
    htmlString: string,
    headerHTMLString?: string | null,
    documentOptions?: DocumentOptions,
    footerHTMLString?: string | null
  ): Promise<Blob | ArrayBuffer | Buffer>;

  export default HTMLtoDOCX;
}
