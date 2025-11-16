import { useQuery } from "@tanstack/react-query";
import { getSpaceById } from "@/services/makeService";

export const useSpaceById = (id: number | undefined, token: string) => {
  return useQuery({
    queryKey: ["space", id],
    queryFn: () => getSpaceById(id!, token),
    enabled: !!id && !!token,
  });
};
