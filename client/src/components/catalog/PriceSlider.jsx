import { useRef, useEffect, useCallback } from "react"

const PriceSlider = ({
  handleMinPriceChange,
  handleMaxPriceChange,
  maxPrice,
  minPrice,
  currentMaxPrice,
  currentMinPrice,
  t,
}) => {
  const sliderRef = useRef()
  const rangeRef = useRef()
  const maxValueRef = useRef()
  const minValueRef = useRef()

  const getPercent = useCallback(
    (value) => Math.round(((value - minPrice) / (maxPrice - minPrice)) * 100),
    [minPrice, maxPrice]
  )

  const handleRangeClick = (e) => {
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()

    const clickX = e.clientX - rect.left // gets click position relative to the slider
    const clickPercent = (clickX / rect.width) * 100
    const newValue = Math.round((clickPercent / 100) * (maxPrice - minPrice) + minPrice)

    const minDiff = Math.abs(newValue - currentMinPrice)
    const maxDiff = Math.abs(newValue - currentMaxPrice)

    if (minDiff < maxDiff) {
      handleMinPriceChange({ target: { value: newValue } })
      minValueRef.current.focus()
    } else {
      handleMaxPriceChange({ target: { value: newValue } })
      maxValueRef.current.focus()
    }
  }

  const handleSliderClick = (e) => {
    const slider = sliderRef.current
    const rect = slider.getBoundingClientRect()

    const clickX = e.clientX - rect.left // gets click position relative to the slider
    const clickPercent = (clickX / rect.width) * 100
    const newValue = Math.round((clickPercent / 100) * (maxPrice - minPrice) + minPrice)

    const minDiff = Math.abs(newValue - currentMinPrice)
    const maxDiff = Math.abs(newValue - currentMaxPrice)

    if (minDiff < maxDiff) {
      handleMinPriceChange({ target: { value: newValue } })
      minValueRef.current.focus()
    } else {
      handleMaxPriceChange({ target: { value: newValue } })
      maxValueRef.current.focus()
    }
  }

  // sets width of the range to decrease from the left side
  useEffect(() => {
    if (maxValueRef.current) {
      const maxPercent = getPercent(Number(maxValueRef.current.value))
      const minPercent = getPercent(currentMinPrice)

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [currentMinPrice, getPercent])

  // sets width of the range to decrease from the right side
  useEffect(() => {
    if (minValueRef.current) {
      const minPercent = getPercent(Number(minValueRef.current.value))
      const maxPercent = getPercent(currentMaxPrice)

      if (rangeRef.current) {
        rangeRef.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [currentMaxPrice, getPercent])

  return (
    <div className="double-slider">
      <input
        id="min-price"
        ref={minValueRef}
        type="range"
        min={minPrice}
        max={maxPrice}
        value={currentMinPrice || minPrice}
        onChange={handleMinPriceChange}
        name="minPrice"
        className={`thumb thumb-layer-3 ${currentMinPrice > maxPrice - 100 ? "thumb-layer-5" : ""}`}
      />
      <input
        id="max-price"
        ref={maxValueRef}
        type="range"
        min={minPrice}
        max={maxPrice}
        value={currentMaxPrice || maxPrice}
        onChange={handleMaxPriceChange}
        name="maxPrice"
        className="thumb thumb-layer-4"
      />
      <div className="slider">
        <div className="price-info">
          <p>
            prices from <span>{currentMinPrice}$</span> to <span>{currentMaxPrice}$</span>
          </p>
        </div>
        <div
          ref={sliderRef}
          onMouseDown={handleSliderClick}
          className="slider-track"
        />
        <div
          ref={rangeRef}
          onMouseDown={handleRangeClick}
          className="slider-range"
        />
        <div className="slider-left-value">{minPrice}$</div>
        <div className="slider-right-value">{maxPrice}$</div>
      </div>
    </div>
  )
}

export default PriceSlider
