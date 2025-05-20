import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectMenu() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="7 day" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="7_day">7 day</SelectItem>
                <SelectItem value="3_day">3 day</SelectItem>
                <SelectItem value="10_day">10 day</SelectItem>
            </SelectContent>
        </Select>
    )
}
