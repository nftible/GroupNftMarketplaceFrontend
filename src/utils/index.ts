export class CurrentToken {
    private token: string = "CURRENT_TOKEN";

    get = (): { token?: string, expiry_date?: number } => {
        const jsonSting = localStorage.getItem(this.token);
        if (jsonSting) { return JSON.parse(jsonSting) }
        return {}
    }
    set = ({ token, expiry_date }: { token: string, expiry_date: number }) => {
        localStorage.setItem(this.token, JSON.stringify({ token, expiry_date }))
    }
    remove = () => {
        localStorage.removeItem(this.token);
    }

}