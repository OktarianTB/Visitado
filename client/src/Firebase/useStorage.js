import { useState, useEffect } from "react";
import { projectStorage } from "./config";

const useStorage = (file, uploadedFiles) => {
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (file.name in uploadedFiles) {
      setProgress(100);
      return;
    }

    const storageRef = projectStorage.ref(file.name);
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => setErrors(error),
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, errors };
};

export default useStorage;
