"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

// React Quill'i client-side only olarak ve daha güvenli bir şekilde yükle
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill-new");
        const QuillComponent = ({ forwardedRef, ...props }: any) => {
            return <RQ ref={forwardedRef} {...props} />;
        };
        return QuillComponent;
    },
    {
        ssr: false,
        loading: () => (
            <div className="h-[250px] w-full bg-[#f5f5f5] animate-pulse rounded-lg flex items-center justify-center text-black/20">
                Editör yükleniyor...
            </div>
        ),
    }
);

const modules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "blockquote"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "align",
    "link",
    "blockquote",
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white"
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    min-height: 250px;
                    font-size: 16px;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    border-color: #e5e5e5;
                }
                .rich-text-editor .ql-toolbar {
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    background: #fafafa;
                    border-color: #e5e5e5;
                }
                .rich-text-editor .ql-editor {
                    min-height: 250px;
                }
                .rich-text-editor .ql-editor.ql-blank::before {
                    color: rgba(0,0,0,0.3);
                    font-style: normal;
                }
            `}</style>
        </div>
    );
}
