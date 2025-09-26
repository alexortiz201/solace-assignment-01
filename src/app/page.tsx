"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AdvocatesSearchForm } from "./features/AdvocatesSearchForm";
import { AdvocatesTable, type Advocate } from "./features/AdvocatesTable";
import { Text, Box, Container, Heading, Quote, Progress } from "@radix-ui/themes";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [resultCount, setResultCount] = useState(0);
  const [status, setStatus] = useState<'pending' | 'error' | 'done'>('pending');

  useEffect(() => {
    const fetchAdvocates = async () => {
      console.log("fetching advocates...")
      const response = await fetch("/api/advocates")
      const jsonResponse = await response.json()

      setAdvocates(jsonResponse.data)
      setFilteredAdvocates(jsonResponse.data)
      setResultCount(jsonResponse.data.length)
      setStatus('done')
    }

    fetchAdvocates()
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm)

    const searchTermLower = searchTerm.toLowerCase()
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        (advocate.firstName).toLowerCase().includes(searchTermLower) ||
        (advocate.lastName).toLowerCase().includes(searchTermLower) ||
        (advocate.city).toLowerCase().includes(searchTermLower) ||
        (advocate.degree).toLowerCase().includes(searchTermLower) ||
        (advocate.specialties).find(s => s.toLowerCase().includes(searchTermLower)) ||
        String(advocate.yearsOfExperience).includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
    setResultCount(filteredAdvocates.length)
  };

  const onClick = () => {
    setSearchTerm('')
    setFilteredAdvocates(advocates)
    setResultCount(advocates.length)
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    console.log({ e, d: formData })
  }

  return (
    <>
      <Container className="w-full max-w-full" position="fixed" top="0" left="0"><Progress className="w-full max-w-full" radius="none" size="1" duration="2s" /></Container>
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
              onClick={() => onClick()}
              onChange={onChange} />
          </div>

          <div className="mb-1">
            <Text>
              {resultCount > 0 && <Quote>Results: {resultCount}</Quote>}
            </Text>
          </div>

          { status === 'done' && <AdvocatesTable advocates={filteredAdvocates} /> }
        </Container>
      </Box>
    </>
  );
}
