import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
    selected: string;
    onChange: (value: string) => void;
}

export default function SelectMenu({ selected, onChange }: Props) {
    return (
        <Select value={selected} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder="7 day" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="hour">Hour</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
        </Select>
    )
}
