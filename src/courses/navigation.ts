type NumberedChapter = {
  chapter: number;
};

export function findNearestChapterNumber(
  chapters: NumberedChapter[],
  requestedChapter: number,
) {
  if (chapters.length === 0 || !Number.isFinite(requestedChapter)) {
    return null;
  }

  let nearestChapter = chapters[0]?.chapter ?? null;

  for (const candidate of chapters) {
    if (nearestChapter === null) {
      nearestChapter = candidate.chapter;
      continue;
    }

    const candidateDistance = Math.abs(candidate.chapter - requestedChapter);
    const nearestDistance = Math.abs(nearestChapter - requestedChapter);

    if (
      candidateDistance < nearestDistance ||
      (candidateDistance === nearestDistance &&
        candidate.chapter < nearestChapter)
    ) {
      nearestChapter = candidate.chapter;
    }
  }

  return nearestChapter;
}

export function resolveChapterNumber({
  chapters,
  requestedChapter,
  resumeChapter,
}: {
  chapters: NumberedChapter[];
  requestedChapter: number | null;
  resumeChapter: number | null;
}) {
  if (chapters.length === 0) {
    return null;
  }

  if (requestedChapter !== null && Number.isFinite(requestedChapter)) {
    return findNearestChapterNumber(chapters, requestedChapter);
  }

  if (resumeChapter !== null && Number.isFinite(resumeChapter)) {
    return findNearestChapterNumber(chapters, resumeChapter);
  }

  return chapters[0]?.chapter ?? null;
}
