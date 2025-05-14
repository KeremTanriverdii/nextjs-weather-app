import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectHours() {
    return (
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="24 Hours" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="4_Hours">4 Hours</SelectItem>
                <SelectItem value="8_Hours">8 Hours</SelectItem>
                <SelectItem value="12_Hours">12 Hours</SelectItem>
            </SelectContent>

        </Select>
    )
}
