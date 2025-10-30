import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

/**
 * Fetches the latest server version and provides download buttons
 * with a terms acceptance modal.
 */
export default function ServerDownload() {
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  useEffect(() => {
    /**
     * Fetches the latest server version from the artifacts API.
     */
    const fetchVersion = async () => {
      try {
        const response = await fetch("https://artifacts.jc4mp.com/releases/latest.txt");
        if (!response.ok) {
          throw new Error("Failed to fetch version");
        }
        const text = await response.text();
        setVersion(text.trim());
      } catch (err) {
        setError("Failed to load latest version");
        console.error("Error fetching version:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVersion();
  }, []);

  /**
   * Generates the download URL for a given platform.
   */
  const getDownloadUrl = (platform: string): string => {
    if (!version) return "#";
    const baseUrl = "https://artifacts.jc4mp.com/releases";
    
    switch (platform) {
      case "windows":
        return `${baseUrl}/JC4MP_server_windows_${version}.zip`;
      case "linux":
        return `${baseUrl}/JC4MP_server_linux_${version}.zip`;
      case "linux-aarch64":
        return `${baseUrl}/JC4MP_server_linux_aarch64_${version}.zip`;
      default:
        return "#";
    }
  };

  /**
   * Handles download button click - shows the modal.
   */
  const handleDownloadClick = (platform: string) => {
    setSelectedPlatform(platform);
    setShowModal(true);
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
  };

  /**
   * Handles the actual download after terms are accepted.
   */
  const handleConfirmDownload = () => {
    if (checkbox1 && checkbox2 && checkbox3 && selectedPlatform) {
      const url = getDownloadUrl(selectedPlatform);
      window.open(url, "_blank");
      setShowModal(false);
      setSelectedPlatform(null);
      setCheckbox1(false);
      setCheckbox2(false);
      setCheckbox3(false);
    }
  };

  /**
   * Closes the modal and resets state.
   */
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlatform(null);
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
  };

  const canDownload = checkbox1 && checkbox2 && checkbox3;

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>Loading latest version...</div>
      )}
      
      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {version && !loading && !error && (
        <>
          <p className={styles.introText}>
            Download the server for your platform below. The latest server version is <code>{version}</code>.
          </p>
          <div className={styles.downloadButtons}>
            <button
              onClick={() => handleDownloadClick("windows")}
              className={clsx(styles.downloadButton, styles.windowsButton)}
            >
              <span className={styles.buttonMainText}>Download Windows Server</span>
              <span className={styles.buttonVersionText}>Version {version}</span>
            </button>
            
            <button
              onClick={() => handleDownloadClick("linux")}
              className={clsx(styles.downloadButton, styles.linuxButton)}
            >
              <span className={styles.buttonMainText}>Download Linux Server</span>
              <span className={styles.buttonVersionText}>Version {version}</span>
            </button>
            
            <button
              onClick={() => handleDownloadClick("linux-aarch64")}
              className={clsx(styles.downloadButton, styles.linuxButton)}
            >
              <span className={styles.buttonMainText}>Download Linux Server ARM64</span>
              <span className={styles.buttonVersionText}>Version {version}</span>
            </button>
          </div>
        </>
      )}

      {showModal && (
        <>
          <div className={styles.modalOverlay} onClick={handleCloseModal} />
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Terms of Use</h3>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <p className={styles.modalIntro}>
                By downloading this server software, you certify that:
              </p>
              
              <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkbox1}
                    onChange={(e) => setCheckbox1(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    I will not use this server software for commercial or for-profit purposes. 
                    I understand that it is against the terms of use of Just Cause 4 Multiplayer 
                    to create monetary gain from server hosting or related services.
                  </span>
                </label>
              </div>
              
              <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkbox2}
                    onChange={(e) => setCheckbox2(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    I will not use this server software for any illegal activities, including 
                    but not limited to allowing pirated copies of the game to join or hosting 
                    content that violates copyright laws.
                  </span>
                </label>
              </div>
              
              <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={checkbox3}
                    onChange={(e) => setCheckbox3(e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>
                    I take full responsibility for all activities, content, and actions that occur 
                    on my server. I understand and agree that the Just Cause 4 Multiplayer team 
                    assumes no liability or responsibility for any issues, damages, or consequences 
                    arising from the use of this server software.
                  </span>
                </label>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button
                onClick={handleCloseModal}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDownload}
                disabled={!canDownload}
                className={clsx(
                  styles.confirmButton,
                  !canDownload && styles.confirmButtonDisabled
                )}
              >
                Download
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

