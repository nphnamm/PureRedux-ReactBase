import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const HeroSection: React.FC = () => {
  const [url, setUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  // const handleDownload = async () => {
  //   if (!url) return alert("Please enter a YouTube URL");

  //   setLoading(true);
  //   try {
  //     const response = await axios.post("http://localhost:8000/download", { url });
  //     setDownloadLink(response.data.file);
  //     toast.success(`Download successfully ${response.data.name}`)
  //     setUrl("");
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //     alert("Failed to download MP3");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleDownload = async () => {
    if (!url) return alert("Please enter a YouTube URL");
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/download", { url });
      const downloadId = response.data.downloadId;

      // Kiểm tra trạng thái tải về mỗi 5s
      const interval = setInterval(async () => {
        const statusRes = await axios.get(`http://localhost:8000/status/${downloadId}`);
        if (statusRes.data.status === "completed") {
          toast.success(`Download successfully ${response.data.name}`)
          clearInterval(interval);
          setDownloadLink(statusRes.data.file);
          setUrl("");
          setIsSuccess(true)
          setLoading(false);
        }
      }, 5000);
    } catch (error) {
      console.error("Error downloading file:", error);
      setIsSuccess(false)
      alert("Failed to download MP3");
    }
  };

  // Khi có link tải, tự động tải file về máy
  const downloadFile = () => {
    if (downloadLink) {
      const link = document.createElement("a");
      link.href = downloadLink;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="bg-black dark:bg-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">Find the Best Courses for You</h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>
        <Button onClick={() => navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">
          Explore Courses
        </Button>
      </div>

      {/* YouTube MP3 Downloader UI */}
      <div className="mt-12 text-center">
        <h2 className="text-white text-2xl font-semibold">YouTube to MP3 Downloader</h2>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Paste YouTube URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-80 px-4 py-2 text-black border rounded-md color-black"
          />
          {loading ? 
           <Button onClick={handleDownload} disabled={loading} className="ml-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
           loading
         </Button> : <Button onClick={handleDownload} className="ml-3 px-6 py-2 bg-blue-600 hover:bg-red-700 text-white rounded-md">
           download
         </Button>  
        }
          {isSuccess ?
            <Button className="ml-3 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              success
            </Button> : <Button className="ml-3 px-6 py-2 bg-blue-600 hover:bg-red-700 text-white rounded-md">
              error
            </Button>
          }


        </div>

        {/* Hiển thị nút tải file khi có link */}
        {downloadLink && (
          <div className="mt-6">
            <Button onClick={downloadFile} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md">
              Click to Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
