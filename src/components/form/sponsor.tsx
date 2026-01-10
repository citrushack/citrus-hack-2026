"use client";

import { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/sponsors";
import { useSession } from "@/utils/auth/auth-client";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/sponsor";
import { submit } from "@/utils/form";

const Sponsor = () => {
  const { data: session } = useSession();

  const [isLoaded, setIsLoaded] = useState(false);
  const [sponsor, setSponsor] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "sponsors",
  });

  useEffect(() => {
    if (!session?.user) return;
    setSponsor((prev) => ({
      ...prev,
      firstName: prev.firstName || session.user.firstName || "",
      lastName: prev.lastName || session.user.lastName || "",
      email: prev.email || session.user.email || "",
      roles: Object.keys(prev.roles || {}).length
        ? prev.roles
        : session.user.roles || {},
    }));
    setIsLoaded(true);
  }, [session?.user]);

  if (!isLoaded || !session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    await submit({
      data: sponsor,
      schema,
      url: "/api/dashboard/sponsors",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={sponsor}
      setObject={setSponsor}
      header="SPONSORSHIP INQUIRY"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Sponsor;
