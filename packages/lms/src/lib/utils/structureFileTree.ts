type TreeNode = DirectoryNode | FileNode;

interface DirectoryNode {
	type: 'directory';
	name: string;
	path: string;
	children: TreeNode[];
}

interface FileNode {
	type: 'file';
	name: string;
	path: string;
}

export function createDirectoryNode(name: string, path: string): DirectoryNode {
	return {
		type: 'directory',
		name,
		path,
		children: []
	};
}

export function createFileNode(name: string, path: string): FileNode {
	return {
		type: 'file',
		name,
		path
	};
}

export function addFileToDirectory(root: DirectoryNode, filePath: string) {
	const parts = filePath.split(/\/|\\/).filter((part) => part.length > 0);
	let currentNode: DirectoryNode = root;

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const isFile = i === parts.length - 1;

		if (isFile) {
			currentNode.children.push(createFileNode(part, filePath));
		} else {
			let childNode = currentNode.children.find(
				(node) => node.type === 'directory' && node.name === part
			) as DirectoryNode;

			if (!childNode) {
				childNode = createDirectoryNode(part, parts.slice(0, i + 1).join('/'));
				currentNode.children.push(childNode);
			}

			currentNode = childNode;
		}
	}
}
