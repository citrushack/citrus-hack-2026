"use client";

import { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/leads";
import { useSession } from "@/utils/auth/auth-client";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/lead";
import { submit } from "@/utils/form";

const Lead = () => {
  const { data: session } = useSession();

  const [isLoaded, setIsLoaded] = useState(false);
  const [lead, setLead] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    roles: session?.user.roles || {},
    email: session?.user.email || "",
    form: "leads",
  });

  useEffect(() => {
    if (!session?.user) return;
    setLead((prev) => ({
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
      data: lead,
      schema,
      url: "/api/dashboard/leads",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={lead}
      setObject={setLead}
      header="LEAD APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Lead;
