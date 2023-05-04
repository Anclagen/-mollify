import { readdir } from 'fs/promises';
import { join } from 'path';

type FileFilter = (filename: string) => boolean;

export async function indexFilesystem(
	dir: string,
	filter: FileFilter = () => true
): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath: string = join(dir, entry.name);

		if (entry.isFile() && filter(entry.name)) {
			files.push(fullPath);
		} else if (entry.isDirectory()) {
			files.push(...(await indexFilesystem(fullPath, filter)));
		}
	}

	return files;
}

export function filterMdFiles(filename: string): boolean {
	return /\.(md)$/i.test(filename);
}
