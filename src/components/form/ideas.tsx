"use client";

import { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/ideas";
import { useSession } from "@/utils/auth/auth-client";
import { schema } from "@/schemas/idea";
import { submit } from "@/utils/form";

const Ideas = () => {
  const { data: session } = useSession();

  const [isLoaded, setIsLoaded] = useState(false);
  const [idea, setIdea] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "idea",
  });

  useEffect(() => {
    if (!session?.user) return;
    setIdea((prev) => ({
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
      data: idea,
      schema,
      url: "/api/dashboard/ideas",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={idea}
      setObject={setIdea}
      header="TEAM IDEA APPLICATION"
      onSubmit={onSubmit}
      bypass={true}
    />
  );
};

export default Ideas;
