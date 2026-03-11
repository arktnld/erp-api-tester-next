'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Fuse from 'fuse.js'
import { getCollectionStructure } from '@/app/actions/collections'
import type { CollectionGroup, CollectionEndpoint } from './lib/parser'

const METHOD_COLOR: Record<string, string> = {
  GET: '#22c55e',
  POST: '#3b82f6',
  PUT: '#f97316',
  PATCH: '#a855f7',
  DELETE: '#ef4444',
}

type CollectionMeta = { id: number; name: string; createdAt: Date }
type CollectionData = { id: number; name: string; structure: { groups: CollectionGroup[] } } | null

interface FuseItem {
  groupName: string
  endpoint: CollectionEndpoint
}

export function CollectionsClient({
  collections,
  initialData,
}: {
  collections: CollectionMeta[]
  initialData: CollectionData
}) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(
    initialData?.id ?? null
  )
  const [collectionData, setCollectionData] = useState<CollectionData>(initialData)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    initialData?.structure.groups[0]?.name ?? null
  )
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set())
  const [highlightedEndpoint, setHighlightedEndpoint] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FuseItem[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const fuseRef = useRef<Fuse<FuseItem> | null>(null)
  const endpointRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!collectionData) { fuseRef.current = null; return }
    const items: FuseItem[] = collectionData.structure.groups.flatMap((g) =>
      g.endpoints.map((ep) => ({ groupName: g.name, endpoint: ep }))
    )
    fuseRef.current = new Fuse(items, {
      keys: ['endpoint.name', 'endpoint.path', 'endpoint.method', 'endpoint.description'],
      threshold: 0.4,
    })
  }, [collectionData])

  useEffect(() => {
    if (!searchQuery.trim() || !fuseRef.current) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    const results = fuseRef.current.search(searchQuery).slice(0, 8).map((r) => r.item)
    setSearchResults(results)
    setShowDropdown(results.length > 0)
  }, [searchQuery])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadCollection = useCallback(async (id: number) => {
    setLoading(true)
    const data = await getCollectionStructure(id)
    setCollectionData(data)
    setSelectedGroup(data?.structure.groups[0]?.name ?? null)
    setExpandedEndpoints(new Set())
    setLoading(false)
  }, [])

  const handleCollectionChange = (id: number) => {
    setSelectedCollectionId(id)
    loadCollection(id)
  }

  const handleSearchSelect = (item: FuseItem) => {
    setSearchQuery('')
    setShowDropdown(false)
    setSelectedGroup(item.groupName)
    const key = item.endpoint.id
    setExpandedEndpoints((prev) => new Set([...prev, key]))
    setHighlightedEndpoint(key)
    setTimeout(() => setHighlightedEndpoint(null), 2000)
    setTimeout(() => {
      endpointRefs.current.get(key)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  const toggleEndpoint = (id: string) => {
    setExpandedEndpoints((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const currentGroup = collectionData?.structure.groups.find((g) => g.name === selectedGroup)

  if (collections.length === 0) {
    return (
      <div style={{ padding: 48, color: 'var(--text-muted)', textAlign: 'center' }}>
        Nenhuma collection encontrada.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Search bar — primeiro elemento */}
      <div ref={searchRef} style={{ position: 'relative', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: '8px 12px',
          }}
        >
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
            <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar endpoint, método, path..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: 'var(--text)' }}
          />
        </div>

        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 16,
              right: 16,
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              zIndex: 100,
              overflow: 'hidden',
            }}
          >
            {searchResults.map((item, i) => (
              <button
                key={i}
                onClick={() => handleSearchSelect(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: i < searchResults.length - 1 ? '1px solid var(--border)' : 'none',
                  color: 'var(--text)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--surface-2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    color: METHOD_COLOR[item.endpoint.method] ?? 'var(--text-muted)',
                    minWidth: 48,
                  }}
                >
                  {item.endpoint.method}
                </span>
                <span style={{ fontSize: 12, fontFamily: 'monospace', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.endpoint.path}
                </span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{item.groupName}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Layout principal */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            minWidth: 220,
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
            <select
              value={selectedCollectionId ?? ''}
              onChange={(e) => handleCollectionChange(Number(e.target.value))}
              style={{
                width: '100%',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '6px 8px',
                fontSize: 12,
                color: 'var(--text)',
                cursor: 'pointer',
              }}
            >
              {collections.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
            {loading ? (
              <div style={{ padding: 12, color: 'var(--text-muted)', fontSize: 12 }}>Carregando...</div>
            ) : (
              collectionData?.structure.groups.map((group) => {
                const active = group.name === selectedGroup
                return (
                  <button
                    key={group.name}
                    onClick={() => setSelectedGroup(group.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '7px 10px',
                      borderRadius: 6,
                      marginBottom: 2,
                      background: active ? 'var(--surface-2)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: active ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: 13,
                      fontWeight: active ? 500 : 400,
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                      {group.name}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        color: 'var(--text-muted)',
                        backgroundColor: 'var(--border)',
                        borderRadius: 10,
                        padding: '1px 6px',
                        marginLeft: 6,
                        flexShrink: 0,
                      }}
                    >
                      {group.endpoints.length}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Painel direito */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
          {currentGroup ? (
            <>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>
                {currentGroup.name}
              </h2>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                {currentGroup.endpoints.length} endpoint{currentGroup.endpoints.length !== 1 ? 's' : ''}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {currentGroup.endpoints.map((ep) => {
                  const expanded = expandedEndpoints.has(ep.id)
                  const highlighted = highlightedEndpoint === ep.id
                  return (
                    <div
                      key={ep.id}
                      ref={(el) => {
                        if (el) endpointRefs.current.set(ep.id, el)
                        else endpointRefs.current.delete(ep.id)
                      }}
                      style={{
                        border: `1px solid ${highlighted ? 'var(--accent)' : 'var(--border)'}`,
                        borderRadius: 8,
                        overflow: 'hidden',
                        backgroundColor: highlighted
                          ? 'color-mix(in srgb, var(--accent) 8%, transparent)'
                          : 'var(--surface)',
                        transition: 'border-color 0.3s, background-color 0.3s',
                      }}
                    >
                      <button
                        onClick={() => toggleEndpoint(ep.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          width: '100%',
                          padding: '10px 14px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: 'var(--text)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            fontFamily: 'monospace',
                            color: METHOD_COLOR[ep.method] ?? 'var(--text-muted)',
                            minWidth: 52,
                          }}
                        >
                          {ep.method}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontFamily: 'monospace',
                            flex: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {ep.path}
                        </span>
                        {ep.name !== ep.path && (
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ep.name}
                          </span>
                        )}
                        <svg
                          width={12} height={12} viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth={2}
                          style={{
                            color: 'var(--text-muted)',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.15s',
                            flexShrink: 0,
                          }}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      {expanded && (
                        <div style={{ padding: '0 14px 14px', borderTop: '1px solid var(--border)' }}>
                          {ep.description && (
                            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 10, marginBottom: 8, lineHeight: 1.5 }}>
                              {ep.description}
                            </p>
                          )}
                          {ep.requestFields && ep.requestFields.length > 0 && (
                            <div style={{ marginTop: 10 }}>
                              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Request
                              </p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {ep.requestFields.map((f) => (
                                  <span
                                    key={f}
                                    style={{
                                      fontSize: 11,
                                      fontFamily: 'monospace',
                                      backgroundColor: 'var(--surface-2)',
                                      border: '1px solid var(--border)',
                                      borderRadius: 4,
                                      padding: '2px 6px',
                                      color: 'var(--text)',
                                    }}
                                  >
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              Selecione uma categoria na lateral.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
