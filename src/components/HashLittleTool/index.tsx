import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { hashlittle } from '@site/src/utils/hashlittle';

export default function HashLittle(): JSX.Element {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOutput(hashlittle(input).toString());
  }, [input]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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
      <div className={styles.outputContainer}>
        <input
          type="text"
          readOnly
          value={output}
          className={styles.output}
        />
        <button
          onClick={copyToClipboard}
          className={clsx(styles.copyButton, copied && styles.copied)}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
