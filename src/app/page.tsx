"use client";

import { useMemo, useState } from "react";
import { AdvocatesSearchForm } from "./features/Advocates/AdvocatesSearchForm";
import { AdvocatesTable, type Advocate } from "./features/Advocates/AdvocatesTable";
import { Text, Box, Container, Heading, Quote, Progress } from "@radix-ui/themes";
import { useAdvocatesQuery } from './features/Advocates/hooks/useAdvocatesQuery'

export default function Home() {
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);
  const query = params.get('q')
  const [searchTerm, setSearchTerm] = useState(query ?? '');
  const { data: advocates = [], status } = useAdvocatesQuery()
  const filteredAdvocates = useMemo(() => {
    const searchTermLower = searchTerm.trim().toLowerCase()
    if (!searchTermLower) return advocates
    return advocates.filter(advocate =>
      (advocate.firstName).toLowerCase().includes(searchTermLower) ||
      (advocate.lastName).toLowerCase().includes(searchTermLower) ||
      (advocate.city).toLowerCase().includes(searchTermLower) ||
      (advocate.degree).toLowerCase().includes(searchTermLower) ||
      (advocate.specialties).some(s => s.toLowerCase().includes(searchTermLower)) ||
      String(advocate.yearsOfExperience).includes(searchTerm)
    )
  }, [advocates, searchTerm])

  const onSetSearchTerm = (e?: React.ChangeEvent<HTMLInputElement>) => {
    let newTerm = e?.target?.value?.trim() || ''
    const url = new URL(window.location.href);

    if (newTerm !== '') url.searchParams.set("q", newTerm)
    else url.searchParams.delete("q")

    setSearchTerm(newTerm)
    window.history.pushState({}, '', url)
  }
  const onChange = onSetSearchTerm
  const onClick = () => onSetSearchTerm()


  return (
    <>
      <Container className="w-full max-w-full" position="fixed" top="0" left="0">
        <Progress className="w-full max-w-full" radius="none" size="1" duration={status === 'pending' ? '2s' : '0s'} />
      </Container>
      <Box style={{ background: "var(--gray-a2)", borderRadius: "var(--radius-3)", marginTop: "20px" }}>
        <Container size="4">
          <Heading className="mb-5" as='h1'>Solace Advocates</Heading>
          <div className="mb-2">
            <Text>
              Searching for: {searchTerm}
            </Text>
          </div>
          <div className="mb-1">
            <AdvocatesSearchForm
              searchTerm={searchTerm}
              onClick={() => onClick()}
              onChange={onChange} />
          </div>

          <div className="mb-1">
            <Text>
              {filteredAdvocates.length > 0 && <Quote>Results: {filteredAdvocates.length}</Quote>}
            </Text>
          </div>

          { status === 'success' && <AdvocatesTable advocates={filteredAdvocates} /> }
        </Container>
      </Box>
    </>
  );
}
