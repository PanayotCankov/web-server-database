export let privateLogs: string[] = [];

export function logs(log: string) {
	console.log(log);
	privateLogs.push(log);
}