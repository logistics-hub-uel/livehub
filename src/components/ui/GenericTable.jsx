import {
  Anchor,
  Group,
  Progress,
  Table,
  Text,
  ActionIcon,
} from "@mantine/core";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import classes from "./GenericTable.module.css";

export default function GenericTable({
  headers,
  data,
  onEdit,
  onDelete,
  onView,
  hideDelete = false,
  hideEdit = false,
}) {
  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      {headers.map(({ key, render }) => (
        <Table.Td key={key}>
          {render ? render(row[key], row) : row[key]}
        </Table.Td>
      ))}
      <Table.Td>
        <Group gap={4}>
          {onView && (
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onView?.(row)}
            >
              <FiEye size={16} />
            </ActionIcon>
          )}
          {!hideEdit && onEdit && (
            <ActionIcon
              variant="subtle"
              color="blue"
              onClick={() => onEdit?.(row.id)}
            >
              <FiEdit size={16} />
            </ActionIcon>
          )}
          {!hideDelete && onDelete && (
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete?.(row.id)}
            >
              <FiTrash2 size={16} />
            </ActionIcon>
          )}
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={1200}>
      <Table verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            {headers.map(({ label, key }) => (
              <Table.Th key={key}>{label}</Table.Th>
            ))}
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
