import { useState } from "react";
import { debounce } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { handlePostQuizWriteImageUpload } from "../../utils/handleUserActions";

const customUploadAdapter = (loader) => {
  // (2)
  return {
    // upload() {
    //   return new Promise((resolve, reject) => {
    //     loader.file.then((file) => {
    //       const { type } = file;
    //       let body = {
    //         image: file,
    //         payload: {
    //           imageType: type,
    //         },
    //       };
    //       handlePostQuizWriteImageUpload(
    //         localStorage.getItem("login-token"),
    //         body
    //       )
    //         .then((res) => {
    //           if (res) {
    //             resolve({
    //               // resolve() 내에 default 값으로 이미지를 접근하기 위한 주소를 적어주면
    //               // <img> 태그 내에 소스가 삽입된 형태로 반환
    //               default: `${res}`,
    //             });
    //           } else {
    //             reject(
    //               new Error("이미지 크기가 허용 가능한 최대 크기를 초과합니다.")
    //             );
    //           }
    //         })
    //         .catch((error) => reject(error));
    //     });
    //   });
    // },
  };
};
function uploadPlugin(editor) {
  // (3)
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return customUploadAdapter(loader);
  };
}
function MyCKEditor({ data, onChange, placeholder = "", initHeight }) {
  // editor height
  const [editorHeight, setEditorHeight] = useState();

  // handle resize
  const handleResize = (_, editor) => {
    editor.editing.view.change((writer) => {
      writer.setStyle(
        "height",
        `${editorHeight}px`,
        editor.editing.view.document.getRoot()
      );
    });
  };

  // height observer for resize
  const resizeObserver = new ResizeObserver(
    debounce((element) => {
      setEditorHeight(element[0].target.offsetHeight);
    }, 100)
  );

  // (1)
  return (
    <CKEditor
      editor={ClassicEditor}
      onReady={(editor) => {
        resizeObserver.observe(editor.ui.view.editable.element);
        // You can store the "editor" and use when it is needed.
        editor.editing.view.change((writer) => {
          writer.setStyle(
            "min-height",
            initHeight,
            editor.editing.view.document.getRoot()
          );
          writer.setStyle(
            "resize",
            "vertical",
            editor.editing.view.document.getRoot()
          );
          writer.setStyle(
            "height",
            `${editorHeight}px`,
            editor.editing.view.document.getRoot()
          );
        });
      }}
      onFocus={handleResize}
      onBlur={handleResize}
      onChange={(event, editor) => onChange(event, editor)}
      onError={(error, { willEditorRestart }) => {
        // If the editor is restarted, the toolbar element will be created once again.
        // The `onReady` callback will be called again and the new toolbar will be added.
        // This is why you need to remove the older toolbar.
        if (willEditorRestart) {
          this.editor.ui.view.toolbar.element.remove();
        }
      }}
      data={data}
      config={{
        placeholder: placeholder,
        extraPlugins: [uploadPlugin], // (4)
      }}
    />
  );
}
export default MyCKEditor;
