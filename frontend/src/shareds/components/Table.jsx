/*
 *  FileName:-     Table.jsx
 *  Description:-  Responsive table component with sorting, selection, and empty state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { SkeletonTableRow } from './Skeleton';
import EmptyState from './EmptyState';

/**
 * Table component
 * @param {Array} columns - [{ key, label, sortable, width, align, render }]
 * @param {Array} data - Array of row objects
 * @param {boolean} loading - Show skeleton rows
 * @param {string} sortKey - Current sort key
 * @param {'asc'|'desc'} sortDir - Sort direction
 * @param {Function} onSort - (key) => void
 * @param {Array} selectedRows - Array of selected row IDs
 * @param {Function} onSelectRow - (id) => void
 * @param {Function} onSelectAll - () => void
 * @param {string} rowKey - Key to use as row identifier (default: 'id')
 */
function Table({
  columns = [],
  data = [],
  loading = false,
  sortKey,
  sortDir = 'asc',
  onSort,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  rowKey = 'id',
  emptyMessage = 'No data available',
  emptyDescription,
  className = '',
  onRowClick,
  stickyHeader = false,
}) {
  const skeletonCount = 5;
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const SortIcon = ({ col }) => {
    if (!col.sortable) return null;
    if (sortKey !== col.key) return <ChevronsUpDown className="w-3.5 h-3.5 opacity-40" />;
    return sortDir === 'asc' ? (
      <ChevronUp className="w-3.5 h-3.5 text-black" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-black" />
    );
  };

  return (
    <div className={`w-full overflow-hidden rounded-xl border border-gray-200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={`bg-gray-50 border-b border-gray-200 ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {/* Selection checkbox */}
              {onSelectRow && (
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    'px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
                    col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                    col.sortable ? 'cursor-pointer hover:text-black select-none group' : '',
                    col.width ? `w-${col.width}` : '',
                  ].filter(Boolean).join(' ')}
                  onClick={col.sortable ? () => onSort?.(col.key) : undefined}
                  style={col.minWidth ? { minWidth: col.minWidth } : undefined}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : ''}`}>
                    {col.label}
                    {col.sortable && <SortIcon col={col} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: skeletonCount }).map((_, i) => (
                <SkeletonTableRow key={i} cols={columns.length + (onSelectRow ? 1 : 0)} />
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onSelectRow ? 1 : 0)}
                  className="py-16"
                >
                  <EmptyState
                    title={emptyMessage}
                    description={emptyDescription}
                    size="sm"
                  />
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const id = row[rowKey];
                const isSelected = selectedRows.includes(id);

                return (
                  <tr
                    key={id}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={[
                      'transition-colors duration-100',
                      onRowClick ? 'cursor-pointer hover:bg-gray-50' : 'hover:bg-gray-50/50',
                      isSelected ? 'bg-gray-50' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {onSelectRow && (
                      <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectRow(id)}
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={[
                          'px-4 py-3 text-sm',
                          col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left',
                          'text-gray-700',
                        ].filter(Boolean).join(' ')}
                      >
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
