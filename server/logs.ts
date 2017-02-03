export let privateLogs: string[] = [];

export default function logs(log: string) {
	console.log(log);
	privateLogs.push(log);
}