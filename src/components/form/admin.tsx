"use client";

import { useEffect, useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/admins";
import { useSession } from "@/utils/auth/auth-client";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/admin";
import { submit } from "@/utils/form";

const Admin = () => {
  const { data: session } = useSession();

  const [isLoaded, setIsLoaded] = useState(false);
  const [admin, setAdmin] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "admins",
  });

  useEffect(() => {
    if (!session?.user) return;
    setAdmin((prev) => ({
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
      data: admin,
      schema,
      url: "/api/dashboard/admins",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={admin}
      setObject={setAdmin}
      header="ADMIN PORTAL REQUEST"
      onSubmit={onSubmit}
      statuses={STATUSES}
    />
  );
};

export default Admin;
