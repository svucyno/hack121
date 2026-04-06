import { useState, useRef, useCallback } from "react";

/**
 * Custom hook to handle MediaRecorder for stealth audio/video evidence capture.
 * Returns controls and state for recording media bursts.
 */
export const useMediaRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = useCallback(async (durationMs = 10000) => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "environment", width: 640, height: 480 }
      }).catch(() => {
        // Fallback to audio-only if camera is denied
        return navigator.mediaDevices.getUserMedia({ audio: true });
      });

      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : MediaRecorder.isTypeSupported('video/webm')
            ? 'video/webm'
            : 'audio/webm'
      });

      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mediaRecorder.mimeType });
        const url = URL.createObjectURL(blob);
        const hasVideo = stream.getVideoTracks().length > 0;

        setRecordings((prev) => [
          {
            id: Date.now(),
            url,
            blob,
            type: hasVideo ? 'video' : 'audio',
            mimeType: mediaRecorder.mimeType,
            timestamp: new Date().toISOString(),
            duration: durationMs / 1000
          },
          ...prev
        ]);

        // Clean up tracks
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setIsRecording(false);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // collect data every second
      setIsRecording(true);

      // Auto-stop after duration
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }, durationMs);

    } catch (err) {
      setError("Media access denied. Please allow camera/microphone permissions.");
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  return { isRecording, recordings, error, startRecording, stopRecording };
};
