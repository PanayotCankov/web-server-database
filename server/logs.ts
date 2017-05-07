export let privateLogs: string[] = [];
let Quiet: boolean = false;
export function setQuiet(quiet: boolean): void {
	Quiet = quiet;
}
export default function logs(log: string): void {
	if (!Quiet && process.env.NODE_ENV != 'test')
		console.log(log);
	privateLogs.push(log);
}