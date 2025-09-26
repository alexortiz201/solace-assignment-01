import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import { useRef } from "react";

type AdvocateSearchFormProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
  searchTerm?: string
}

export const AdvocatesSearchForm = ({ onChange, onClick, searchTerm }: AdvocateSearchFormProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <TextField.Root ref={searchInputRef} onChange={onChange} placeholder="Search for Advocates…" value={searchTerm}>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <Button className="rounded-l-none" onClick={() => {
          if (searchInputRef && searchInputRef.current) searchInputRef.current.value = ''
          onClick()
        }}>Reset Search</Button>
      </TextField.Root>
    </>
  )
}