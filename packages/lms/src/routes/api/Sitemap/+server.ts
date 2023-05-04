import { filterMdFiles, indexFilesystem } from '$lib/utils/indexFilesystem';

export async function GET(): Promise<object> {
	const projectRoot = 'src/routes/content';
	const indexedFiles: string[] = await indexFilesystem(projectRoot, filterMdFiles);

	return new Response(JSON.stringify(indexedFiles));
}
