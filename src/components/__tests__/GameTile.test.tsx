import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GameTile } from '../GameTile'
import { Tile } from '../../types/game'

describe('GameTile', () => {
  const mockTile: Tile = {
    id: 1,
    imageId: 0,
    isFlipped: false,
    isMatched: false
  }

  const mockOnFlip = jest.fn()

  beforeEach(() => {
    mockOnFlip.mockClear()
  })

  it('renders correctly with back side showing', () => {
    render(<GameTile tile={mockTile} onFlip={mockOnFlip} />)
    
    const logoImage = screen.getByAltText('Growy Logo')
    expect(logoImage).toBeInTheDocument()
  })

  it('calls onFlip when clicked and tile is not flipped', () => {
    render(<GameTile tile={mockTile} onFlip={mockOnFlip} />)
    
    const tileElement = screen.getByRole('img', { name: 'Growy Logo' }).closest('div')
    fireEvent.click(tileElement!)
    
    expect(mockOnFlip).toHaveBeenCalledWith(1)
  })

  it('does not call onFlip when tile is already flipped', () => {
    const flippedTile: Tile = { ...mockTile, isFlipped: true }
    render(<GameTile tile={flippedTile} onFlip={mockOnFlip} />)
    
    const tileElement = screen.getByRole('img', { name: 'Plant 1' }).closest('div')
    fireEvent.click(tileElement!)
    
    expect(mockOnFlip).not.toHaveBeenCalled()
  })

  it('does not call onFlip when tile is matched', () => {
    const matchedTile: Tile = { ...mockTile, isMatched: true }
    render(<GameTile tile={matchedTile} onFlip={mockOnFlip} />)
    
    const tileElement = screen.getByRole('img', { name: 'Plant 1' }).closest('div')
    fireEvent.click(tileElement!)
    
    expect(mockOnFlip).not.toHaveBeenCalled()
  })

  it('does not call onFlip when disabled', () => {
    render(<GameTile tile={mockTile} onFlip={mockOnFlip} disabled={true} />)
    
    const tileElement = screen.getByRole('img', { name: 'Growy Logo' }).closest('div')
    fireEvent.click(tileElement!)
    
    expect(mockOnFlip).not.toHaveBeenCalled()
  })

  it('shows plant image when flipped', () => {
    const flippedTile: Tile = { ...mockTile, isFlipped: true }
    render(<GameTile tile={flippedTile} onFlip={mockOnFlip} />)
    
    const plantImage = screen.getByAltText('Plant 1')
    expect(plantImage).toBeInTheDocument()
  })

  it('shows checkmark when matched', () => {
    const matchedTile: Tile = { ...mockTile, isMatched: true }
    render(<GameTile tile={matchedTile} onFlip={mockOnFlip} />)
    
    // Check for the checkmark SVG
    const checkmark = screen.getByRole('img', { name: 'Plant 1' }).parentElement?.querySelector('svg')
    expect(checkmark).toBeInTheDocument()
  })
})