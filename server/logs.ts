export let privateLogs: string[] = [];
let Quiet: boolean = false;
export function setQuiet(quiet: boolean): void {
	Quiet = quiet;
}
export default function logs(log: string): void {
	privateLogs.push(log);
	if (Quiet ||
		(process.env.NODE_ENV &&
		(process.env.NODE_ENV != 'test' || process.env.NODE_ENV != 'production')))
		return;
	console.log(log);
}