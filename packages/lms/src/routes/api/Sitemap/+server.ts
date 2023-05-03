import { filterSvelteAndRelatedFiles, indexFilesystem } from '$lib/utils/indexFilesystem';

export async function GET(): Promise<object> {
	const projectRoot = 'src/routes/content';
	const indexedFiles: string[] = await indexFilesystem(projectRoot, filterSvelteAndRelatedFiles);

	return new Response(JSON.stringify(indexedFiles));
}
