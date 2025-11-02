import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface ServerArtifact {
  url: string;
  size: number;
  last_modified: string;
}

interface ParsedArtifact {
  url: string;
  size: number;
  last_modified: string;
  version: string;
  platform: "windows" | "linux" | "aarch";
  platformDisplay: string;
}

interface ServerArtifactsResponse {
  client: ServerArtifact[];
}

/**
 * Fetches server artifacts and displays them in a table with download links.
 */
export default function ServerDownload() {
  const [artifacts, setArtifacts] = useState<ParsedArtifact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  const [latestArtifacts, setLatestArtifacts] = useState<ParsedArtifact[]>([]);
  const [previousArtifacts, setPreviousArtifacts] = useState<ParsedArtifact[]>([]);
  const [showPreviousVersions, setShowPreviousVersions] = useState(false);

  /**
   * Parses version number from URL.
   * Format: JC4MP_server_{platform}_{version}.zip
   */
  const parseVersion = (url: string): string | null => {
    // Match: JC4MP_server_{platform}_{version}.zip
    // Platform can be: windows, linux, or linux_aarch64
    const match = url.match(/JC4MP_server_(?:windows|linux(?:_aarch64)?)_(.+?)\.zip$/);
    return match ? match[1] : null;
  };

  /**
   * Parses platform from URL.
   */
  const parsePlatform = (url: string): { platform: "windows" | "linux" | "aarch"; display: string } => {
    if (url.includes("_windows_")) {
      return { platform: "windows", display: "Windows" };
    } else if (url.includes("_linux_aarch64_")) {
      return { platform: "aarch", display: "Linux ARM64" };
    } else if (url.includes("_linux_")) {
      return { platform: "linux", display: "Linux" };
    }
    return { platform: "linux", display: "Linux" };
  };

  /**
   * Compares two version strings (e.g., "1.0.3" vs "1.0.1").
   */
  const compareVersions = (a: string, b: string): number => {
    const aParts = a.split(".").map(Number);
    const bParts = b.split(".").map(Number);
    const maxLength = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < maxLength; i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;
      if (aPart > bPart) return -1;
      if (aPart < bPart) return 1;
    }
    return 0;
  };

  /**
   * Formats file size in bytes to human-readable format.
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  useEffect(() => {
    /**
     * Fetches server artifacts from the API.
     */
    const fetchArtifacts = async () => {
      try {
        const response = await fetch("https://jc4mp.com/server-artifacts");
        if (!response.ok) {
          throw new Error("Failed to fetch artifacts");
        }
        const data: ServerArtifactsResponse = await response.json();
        
        // Parse artifacts
        const parsed: ParsedArtifact[] = [];
        for (const artifact of data.client) {
          const version = parseVersion(artifact.url);
          if (!version) continue;
          
          const { platform, display } = parsePlatform(artifact.url);
          parsed.push({
            ...artifact,
            version,
            platform,
            platformDisplay: display,
          });
        }

        // Find latest version
        let latestVer: string | null = null;
        if (parsed.length > 0) {
          const versions = [...new Set(parsed.map(a => a.version))];
          versions.sort(compareVersions);
          latestVer = versions[0];
          setLatestVersion(latestVer);
        }

        // Sort: latest versions first, then within each version: windows, linux, aarch
        const platformOrder = { windows: 0, linux: 1, aarch: 2 };
        parsed.sort((a, b) => {
          const versionCompare = compareVersions(a.version, b.version);
          if (versionCompare !== 0) return versionCompare;
          return platformOrder[a.platform] - platformOrder[b.platform];
        });

        // Separate latest and previous artifacts
        if (latestVer) {
          const latest = parsed.filter(a => a.version === latestVer);
          const previous = parsed.filter(a => a.version !== latestVer);
          setLatestArtifacts(latest);
          setPreviousArtifacts(previous);
        } else {
          setLatestArtifacts([]);
          setPreviousArtifacts(parsed);
        }

        setArtifacts(parsed);
      } catch (err) {
        setError("Failed to load server artifacts");
        console.error("Error fetching artifacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  /**
   * Handles download button click - shows the modal.
   */
  const handleDownloadClick = (url: string) => {
    setSelectedUrl(url);
    setShowModal(true);
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
  };

  /**
   * Handles the actual download after terms are accepted.
   */
  const handleConfirmDownload = () => {
    if (checkbox1 && checkbox2 && checkbox3 && selectedUrl) {
      window.open(selectedUrl, "_blank");
      setShowModal(false);
      setSelectedUrl(null);
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
    setSelectedUrl(null);
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
  };

  const canDownload = checkbox1 && checkbox2 && checkbox3;

  /**
   * Renders a table of artifacts.
   */
  const renderArtifactTable = (artifactList: ParsedArtifact[], showVersion: boolean = true) => {
    return (
      <table className={styles.downloadTable}>
        <thead>
          <tr>
            {showVersion && <th>Version</th>}
            <th>Platform</th>
            <th>Size</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {artifactList.map((artifact, index) => (
            <tr key={`${artifact.version}-${artifact.platform}-${index}`}>
              {showVersion && (
                <td>
                  {artifact.version === latestVersion ? (
                    <strong>
                      {artifact.version} <span className={styles.latestBadge}>Latest</span>
                    </strong>
                  ) : (
                    artifact.version
                  )}
                </td>
              )}
              <td>{artifact.platformDisplay}</td>
              <td>{formatFileSize(artifact.size)}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDownloadClick(artifact.url)}
                  className={styles.downloadLink}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>Loading server artifacts...</div>
      )}
      
      {error && (
        <div className={styles.error}>{error}</div>
      )}

      {artifacts.length > 0 && !loading && !error && (
        <>
          {latestVersion && latestArtifacts.length > 0 && (
            <>
              <p className={styles.introText}>
                The latest server version is <code>{latestVersion}</code>.
              </p>
              <div className={styles.latestSection}>
                <h3 className={styles.sectionTitle}>Latest Version</h3>
                <div className={styles.tableWrapper}>
                  {renderArtifactTable(latestArtifacts, true)}
                </div>
              </div>
            </>
          )}

          {previousArtifacts.length > 0 && (
            <div className={styles.previousSection}>
              <button
                type="button"
                onClick={() => setShowPreviousVersions(!showPreviousVersions)}
                className={styles.toggleButton}
                aria-expanded={showPreviousVersions}
              >
                <span className={styles.toggleButtonText}>
                  Previous Versions
                </span>
                <span className={clsx(styles.toggleIcon, showPreviousVersions && styles.toggleIconOpen)}>
                  ▼
                </span>
              </button>
              
              {showPreviousVersions && (
                <div className={styles.previousContent}>
                  <div className={styles.tableWrapper}>
                    {renderArtifactTable(previousArtifacts, true)}
                  </div>
                </div>
              )}
            </div>
          )}
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

