import React, { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import { hashlittle } from "@site/src/utils/hashlittle";

export default function HashLittle(): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copiedSigned, setCopiedSigned] = useState(false);
  const [copiedUnsigned, setCopiedUnsigned] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);

  useEffect(() => {
    setOutput(hashlittle(input).toString());
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={styles.hashLittleContainer}>
      <h2 className={styles.title}>HashLittle</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter text to hash"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.outputs}>
        <div className={styles.outputContainer}>
          <span className={styles.label}>uint32</span>
          <input
            type="text"
            readOnly
            value={output}
            className={styles.output}
          />
          <button
            onClick={() => {
              copyToClipboard(output);
              setCopiedUnsigned(true);
              setTimeout(() => setCopiedUnsigned(false), 2000);
            }}
            className={clsx(styles.copyButton, copiedUnsigned && styles.copied)}
          >
            {copiedUnsigned ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className={styles.outputContainer}>
          <span className={styles.label}>int32</span>
          <input
            type="text"
            readOnly
            value={parseInt(output) >> 0}
            className={styles.output}
          />
          <button
            onClick={() => {
              copyToClipboard((parseInt(output) >> 0).toString());
              setCopiedSigned(true);
              setTimeout(() => setCopiedSigned(false), 2000);
            }}
            className={clsx(styles.copyButton, copiedSigned && styles.copied)}
          >
            {copiedSigned ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className={styles.outputContainer}>
          <span className={styles.label}>hex</span>
          <input
            type="text"
            readOnly
            value={`0x${parseInt(output).toString(16).toUpperCase()}`}
            className={styles.output}
          />
          <button
            onClick={() => {
              copyToClipboard(
                `0x${parseInt(output).toString(16).toUpperCase()}`
              );
              setCopiedHex(true);
              setTimeout(() => setCopiedHex(false), 2000);
            }}
            className={clsx(styles.copyButton, copiedHex && styles.copied)}
          >
            {copiedHex ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
