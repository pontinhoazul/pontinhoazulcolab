import React from 'react'

export default function Badge({ value }) {
  const styles = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
  }

  if (value === 'urgente') {
    return <span style={{ ...styles, background: '#FDECEA', color: '#C0392B' }}>Urgente</span>
  }

  return <span style={{ ...styles, background: '#E8F4FD', color: '#1A7A45' }}>Normal</span>
}
