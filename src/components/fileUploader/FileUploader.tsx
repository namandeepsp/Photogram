import { useState, useRef, useCallback } from "react";
import {
  UploadCtxProvider,
  FileUploaderRegular,
  OutputFileEntry,
} from "@uploadcare/react-uploader";
import * as UC from "@uploadcare/file-uploader";
import "@uploadcare/react-uploader/core.css";
import { FileEntry } from "@/types";
import "./FileUploader.css";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  multiple?: boolean;
  showPreview?: boolean;
}

UC.defineComponents(UC);

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry: { files },
  onChange,
  multiple = true,
  showPreview = true,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    OutputFileEntry<"success">[]
  >([]);
  const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);

  const handleRemoveClick = useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({
        files: files.filter((f) => f.uuid !== uuid),
      }),
    [files, onChange]
  );

  const resetUploaderState = () =>
    ctxProviderRef.current?.uploadCollection.clearAll();

  const handleModalCloseEvent = () => {
    resetUploaderState();

    onChange({
      files: [...files, ...uploadedFiles],
    });

    setUploadedFiles([]);
  };

  const handleChangeEvent = (files) => {
    setUploadedFiles([
      ...files.allEntries.filter((f) => f.status === "success"),
    ] as OutputFileEntry<"success">[]);
  };

  return (
    <div>
      <FileUploaderRegular
        imgOnly
        multiple={multiple}
        removeCopyright
        confirmUpload={false}
        apiRef={ctxProviderRef}
        onModalClose={handleModalCloseEvent}
        onChange={handleChangeEvent}
        pubkey={import.meta.env.VITE_FILE_UPLOADER_KEY}
      />
      {showPreview && (
        <div className="previews">
          {files.map(({ uuid, cdnUrl, fileInfo }) => (
            <div key={uuid} className="preview">
              <img
                className="previewImage"
                key={uuid}
                src={`${cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                width="100"
                alt={fileInfo?.originalFilename || ""}
                title={fileInfo?.originalFilename || ""}
              />

              <button
                className="previewRemoveButton"
                type="button"
                onClick={() => handleRemoveClick(uuid)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
