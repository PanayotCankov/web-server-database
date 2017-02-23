export let privateLogs: string[] = [];

export default function logs(log: string):void {
	console.log(log);
	privateLogs.push(log);
}