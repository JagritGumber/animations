import { chromium } from "playwright";
import { mkdir, readdir, rename, unlink } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";

const url = "http://localhost:8080/one/";
const outputDir = "public/one/video";
const finalVideo = "public/one/one.mp4";
const width = 1280;
const height = 720;
const durationMs = 10000;

const runFfmpeg = async (inputPath: string, outputPath: string) => {
  const ffmpegPath = (await import("ffmpeg-static")).default;
  if (!ffmpegPath) {
    throw new Error("ffmpeg-static missing");
  }

  await new Promise<void>((resolve, reject) => {
    const process = spawn(
      ffmpegPath,
      [
        "-y",
        "-i",
        inputPath,
        "-c:v",
        "libx264",
        "-pix_fmt",
        "yuv420p",
        "-r",
        "30",
        outputPath,
      ],
      { stdio: "inherit" }
    );

    process.on("error", reject);
    process.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
};

await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width, height },
  recordVideo: { dir: outputDir, size: { width, height } },
});
const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(durationMs);
await context.close();
await browser.close();

const files = await readdir(outputDir);
const webmFile = files.find((file) => file.endsWith(".webm"));

if (!webmFile) {
  throw new Error("Recorded video not found");
}

const webmPath = join(outputDir, webmFile);
await runFfmpeg(webmPath, finalVideo);
await unlink(webmPath);
