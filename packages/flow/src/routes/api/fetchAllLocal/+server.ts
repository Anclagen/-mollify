import { fetchMarkdownFiles } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allFiles = await fetchMarkdownFiles();

	return json(allFiles);
};
