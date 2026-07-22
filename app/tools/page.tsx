"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Key, Lock, Unlock, RefreshCw, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom hook for scramble effect
function useScrambleText(originalText: string, speed = 30) {
  const [scrambled, setScrambled] = React.useState(originalText);
  const chars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const triggerScramble = React.useCallback(() => {
    if (!originalText) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(
        originalText
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [originalText, speed]);

  return { scrambled, triggerScramble };
}

export default function ToolsPage() {
  const [keyLength, setKeyLength] = React.useState<2048 | 4096>(2048);
  const [generating, setGenerating] = React.useState(false);
  const [keyPair, setKeyPair] = React.useState<{ publicKey: string; privateKey: string } | null>(null);

  // RSA Key Generation using Web Crypto API
  const generateKeys = async () => {
    setGenerating(true);
    try {
      const generated = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: keyLength,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true, // exportable
        ["encrypt", "decrypt"]
      );

      // Export to PEM format (simulated with standard base64 DER formatting)
      const pubExport = await window.crypto.subtle.exportKey("spki", generated.publicKey);
      const privExport = await window.crypto.subtle.exportKey("pkcs8", generated.privateKey);

      const pubBase64 = btoa(String.fromCharCode(...new Uint8Array(pubExport)));
      const privBase64 = btoa(String.fromCharCode(...new Uint8Array(privExport)));

      setKeyPair({
        publicKey: `-----BEGIN PUBLIC KEY-----\n${pubBase64.match(/.{1,64}/g)?.join("\n")}\n-----END PUBLIC KEY-----`,
        privateKey: `-----BEGIN PRIVATE KEY-----\n${privBase64.match(/.{1,64}/g)?.join("\n")}\n-----END PRIVATE KEY-----`,
      });
    } catch (err) {
      console.error(err);
      alert("Key generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  // Encrypt & Decrypt States
  const [encryptKey, setEncryptKey] = React.useState("");
  const [plaintext, setPlaintext] = React.useState("");
  const [ciphertext, setCiphertext] = React.useState("");

  const [decryptKey, setDecryptKey] = React.useState("");
  const [cipherInput, setCipherInput] = React.useState("");
  const [decryptedText, setDecryptedText] = React.useState("");

  // Helper to convert PEM back to ArrayBuffer
  const pemToArrayBuffer = (pem: string, type: "PUBLIC" | "PRIVATE") => {
    const lines = pem.trim().split("\n");
    const base64 = lines
      .filter((line) => !line.startsWith("-----BEGIN") && !line.endsWith("-----END"))
      .join("")
      .replace(/\s/g, "");
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  };

  // Handle Encryption
  const handleEncrypt = async () => {
    if (!encryptKey || !plaintext) return;
    try {
      const spkiBuffer = pemToArrayBuffer(encryptKey, "PUBLIC");
      const importedPubKey = await window.crypto.subtle.importKey(
        "spki",
        spkiBuffer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        false,
        ["encrypt"]
      );

      const encoder = new TextEncoder();
      const encodedData = encoder.encode(plaintext);
      const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        importedPubKey,
        encodedData
      );

      const base64Cipher = btoa(String.fromCharCode(...new Uint8Array(encrypted)));
      setCiphertext(base64Cipher);
    } catch (err) {
      console.error(err);
      alert("Encryption failed. Make sure your public key is in correct PEM format.");
    }
  };

  // Handle Decryption
  const handleDecrypt = async () => {
    if (!decryptKey || !cipherInput) return;
    try {
      const pkcs8Buffer = pemToArrayBuffer(decryptKey, "PRIVATE");
      const importedPrivKey = await window.crypto.subtle.importKey(
        "pkcs8",
        pkcs8Buffer,
        {
          name: "RSA-OAEP",
          hash: "SHA-256",
        },
        false,
        ["decrypt"]
      );

      const binaryCipher = atob(cipherInput);
      const bytes = new Uint8Array(binaryCipher.length);
      for (let i = 0; i < binaryCipher.length; i++) {
        bytes[i] = binaryCipher.charCodeAt(i);
      }

      const decrypted = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        importedPrivKey,
        bytes.buffer
      );

      const decoder = new TextDecoder();
      setDecryptedText(decoder.decode(decrypted));
    } catch (err) {
      console.error(err);
      alert("Decryption failed. Check if the ciphertext and private key match.");
    }
  };

  // Scramble Effects setup
  const { scrambled: scrambledPublicKey, triggerScramble: triggerPubScramble } = useScrambleText(keyPair?.publicKey || "");
  const { scrambled: scrambledPrivateKey, triggerScramble: triggerPrivScramble } = useScrambleText(keyPair?.privateKey || "");
  const { scrambled: scrambledCipher, triggerScramble: triggerCipherScramble } = useScrambleText(ciphertext || "");
  const { scrambled: scrambledDecrypted, triggerScramble: triggerDecryptedScramble } = useScrambleText(decryptedText || "");

  React.useEffect(() => {
    if (keyPair) {
      triggerPubScramble();
      triggerPrivScramble();
    }
  }, [keyPair, triggerPubScramble, triggerPrivScramble]);

  React.useEffect(() => {
    if (ciphertext) {
      triggerCipherScramble();
    }
  }, [ciphertext, triggerCipherScramble]);

  React.useEffect(() => {
    if (decryptedText) {
      triggerDecryptedScramble();
    }
  }, [decryptedText, triggerDecryptedScramble]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        
        {/* Offline Safety Declaration Banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="size-5 shrink-0 animate-[pulse_2s_infinite]" />
          <div className="text-xs md:text-sm">
            <span className="font-bold">100% Offline Assurance:</span> All calculations, randomizations, and cryptographic transformations occur solely in your local browser sandbox. No packets are transmitted.
          </div>
        </div>

        {/* Section Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Security & Cryptography Lab</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate RSA Key pairs, encrypt payloads with a recipient's public key, and decrypt content inside a secure environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Keypair Generator Card */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-border/50 pb-3">
              <Key className="size-5 text-indigo-500" />
              <h2 className="font-bold text-md">RSA Keypair Generator</h2>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-mono text-muted-foreground">Select Key Size</label>
              <div className="flex gap-2">
                {[2048, 4096].map((len) => (
                  <button
                    key={len}
                    onClick={() => setKeyLength(len as 2048 | 4096)}
                    className={cn(
                      "flex-1 py-1.5 rounded-lg border font-mono text-xs transition-colors",
                      keyLength === len
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-500"
                        : "border-border hover:border-foreground/30 text-muted-foreground"
                    )}
                  >
                    {len} bits
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={generateKeys}
              disabled={generating}
              className="w-full h-9 flex items-center justify-center gap-2 font-mono text-xs active:scale-[0.98] transition-transform"
            >
              {generating ? (
                <>
                  <RefreshCw className="size-3.5 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Keys"
              )}
            </Button>

            {/* Generated Keys Display */}
            {keyPair && (
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-indigo-500">Public Key (PEM)</span>
                  <textarea
                    readOnly
                    value={scrambledPublicKey}
                    className="w-full h-24 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border resize-none focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    size="xs"
                    className="self-end"
                    onClick={() => {
                      navigator.clipboard.writeText(keyPair.publicKey);
                      alert("Copied public key to clipboard!");
                    }}
                  >
                    Copy Public Key
                  </Button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono uppercase text-amber-500">Private Key (PEM)</span>
                  <textarea
                    readOnly
                    value={scrambledPrivateKey}
                    className="w-full h-24 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border resize-none focus:outline-none"
                  />
                  <Button
                    variant="outline"
                    size="xs"
                    className="self-end"
                    onClick={() => {
                      navigator.clipboard.writeText(keyPair.privateKey);
                      alert("Copied private key to clipboard!");
                    }}
                  >
                    Copy Private Key
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Encryption & Decryption Workstation */}
          <div className="flex flex-col gap-8">
            
            {/* Encrypt Block */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                <Lock className="size-5 text-indigo-500" />
                <h2 className="font-bold text-md">RSA Encrypt</h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Recipient Public Key (PEM)</label>
                  <textarea
                    placeholder="Paste PEM public key here..."
                    value={encryptKey}
                    onChange={(e) => setEncryptKey(e.target.value)}
                    className="w-full h-20 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Plaintext Message</label>
                  <input
                    type="text"
                    placeholder="Enter message to encrypt..."
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-black/5 dark:bg-black/20 text-sm border border-border focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <Button
                  onClick={handleEncrypt}
                  disabled={!encryptKey || !plaintext}
                  className="h-9 font-mono text-xs active:scale-[0.98] transition-transform"
                >
                  Encrypt Message
                </Button>

                {ciphertext && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] font-mono uppercase text-emerald-500">Ciphertext Output (Base64)</span>
                    <textarea
                      readOnly
                      value={scrambledCipher}
                      className="w-full h-20 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border resize-none focus:outline-none"
                    />
                    <Button
                      variant="outline"
                      size="xs"
                      className="self-end"
                      onClick={() => {
                        navigator.clipboard.writeText(ciphertext);
                        alert("Copied ciphertext to clipboard!");
                      }}
                    >
                      Copy Ciphertext
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Decrypt Block */}
            <div className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-border/50 pb-3">
                <Unlock className="size-5 text-emerald-500" />
                <h2 className="font-bold text-md">RSA Decrypt</h2>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Your Private Key (PEM)</label>
                  <textarea
                    placeholder="Paste PEM private key here..."
                    value={decryptKey}
                    onChange={(e) => setDecryptKey(e.target.value)}
                    className="w-full h-20 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-muted-foreground">Ciphertext (Base64)</label>
                  <textarea
                    placeholder="Paste Base64 ciphertext here..."
                    value={cipherInput}
                    onChange={(e) => setCipherInput(e.target.value)}
                    className="w-full h-20 p-2 rounded-lg bg-black/5 dark:bg-black/20 font-mono text-[10px] border border-border focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <Button
                  onClick={handleDecrypt}
                  disabled={!decryptKey || !cipherInput}
                  className="h-9 font-mono text-xs bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.98] transition-transform"
                >
                  Decrypt Ciphertext
                </Button>

                {decryptedText && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[10px] font-mono uppercase text-indigo-500 font-bold">Decrypted Message</span>
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm font-mono text-foreground break-all">
                      {scrambledDecrypted}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </main>

      <footer className="border-t border-border bg-card/20 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Abulfadl Ahmadi. Lab system offline.</div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-foreground">About CV</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
