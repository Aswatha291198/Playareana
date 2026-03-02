import React, { useEffect, useState } from 'react'
import { DatePicker, Dropdown } from 'antd'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getGroupgameByCity } from '../../api/book'
import { getAllGame } from '../../api/game'
import { useDispatch } from 'react-redux'
import { showLoading, hideLoading } from '../../../redux/slice/userSlice'
import { DownOutlined } from '@ant-design/icons'
import moment from 'moment'
import { GiWhistle, GiTennisBall } from "react-icons/gi"
import { LuMapPin } from "react-icons/lu"
import { MdOutlineSportsCricket } from "react-icons/md"
import { BiFootball } from "react-icons/bi"
import { IoBasketballOutline } from "react-icons/io5"

const Play = () => {
  const [searchParams] = useSearchParams()
  const city = searchParams.get('city')
  const [date, setDate] = useState(null)
  const [venue, setVenue] = useState([])
  const [open, setOpen] = useState(false)
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState('')
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const sportIconMap = {
    Cricket: <MdOutlineSportsCricket />,
    Football: <BiFootball />,
    Tennis: <GiTennisBall />,
    Basketball: <IoBasketballOutline />,
  }

  const getTime = (hour) => moment(hour, 'HH').format('hh:mm A')
  const getDay = (date) => moment(date).format('ddd')
  const getDate = (date) => moment(date).format('DD MMM YYYY')

  // Filter out past games
  const filterGames = venue.filter(b => {
    if (!b.date || b.startTime == null) return false
    const gameStart = moment(b.date).set('hour', b.startTime).set('minute', 0).set('second', 0)
    return gameStart.isAfter(moment())
  })

  const getData = async () => {
    try {
      dispatch(showLoading())
      setLoading(true)

      const gameResponse = await getAllGame()
      const response = await getGroupgameByCity(city, selectedGame, date)

      if (response) setVenue(response.data)
      if (gameResponse.success) setGames(gameResponse.data)
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    getData()
  }, [city, selectedGame, date])

  const handleDateChange = (date, dateString) => {
    setDate(moment(dateString).format('YYYY-MM-DD') || null)
  }

  const handleGameSelect = (game) => {
    setSelectedGame(game.name)
    setOpen(false)
  }

  return (
    <main className='flex-c gp-10'>
      <section className='d-f-center h-1 w-1'>
        <h1 className='font-p ls mt mr-3'>Games in {city}</h1>
      </section>

      {/* Filters */}
      <section>
        <div className='m-20 d-flex justify-content-between'>
          <div className='bor' style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
            <DatePicker
              className='font-p f-6 c-p'
              placeholder='Date'
              inputReadOnly
              disabledDate={(current) => current && current < moment().startOf('day')}
              suffixIcon={<DownOutlined />}
              format='YYYY-MM-DD'
              onChange={handleDateChange}
              variant='borderless'
            />
          </div>

          <div className='w-color bor'>
            <Dropdown
              trigger={['click']}
              placement="bottomLeft"
              open={open}
              onOpenChange={(flag) => setOpen(flag)}
              popupRender={() => (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 150,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '5px 0'
                }}>
                  {games.map((game) => (
                    <div
                      key={game._id}
                      onClick={() => handleGameSelect(game)}
                      style={{ padding: '8px 15px', cursor: 'pointer' }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                      {game.name}
                    </div>
                  ))}
                </div>
              )}
            >
              <div className='border-black c-p d-flex text-center' style={{
                height: 40,
                borderRadius: 10,
                width: 200,
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 10px',
                cursor: 'pointer'
              }}>
                <GiWhistle className='font-larger b-color' />
                <span className='font-p f-6'>{selectedGame || 'Sport'}</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section>
        <div className='m-20'>
          <div className='d-grid-play gap' style={{ marginLeft: '50px' }}>
            {loading ? (
              <div className='d-f-center' style={{ minWidth: '50vw' }}>
                <span>Loading games...</span>
              </div>
            ) : filterGames.length === 0 ? (
              <div className='d-f-center' style={{ minWidth: '50vw' }}>
                <div className='py-3' style={{
                  minHeight: 120,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  minWidth: 280,
                  alignContent: 'center',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  <span className='font-s f-6 ls cap font-large text-center ml-3'>No games found</span>
                </div>
              </div>
            ) : (
              filterGames.map((ve) => (
                <div
                  key={ve._id}
                  className='flex-c c-p bor gp-10'
                  style={{
                    height: 200,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => navigate(`/join-game/${ve._id}`)}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div className='d-f-center g-color' style={{ borderRadius: '10px 10px 0 0', height: 40 }}>
                    <span className='font-p text-color-w ls f-6'>{ve.turf.name}</span>
                  </div>

                  <div className='d-flex'>
                    <span className='py-3 b-color cap font-p ls' style={{ fontSize: '14px', color: 'rgb(117, 138, 128)' }}>
                      {ve.hostedBy.name}
                    </span>
                  </div>

                  <div className='flex-c gp-10'>
                    <span className='py-3 f-6 cap font-p ls' style={{ fontSize: '12px' }}>
                      {getDay(ve.date)}, {getDate(ve.date)}
                    </span>
                    <span className='py-3 f-6 cap font-p ls' style={{ fontSize: '12px' }}>
                      {getTime(ve.startTime)}-{getTime(ve.endTime)}
                    </span>
                  </div>

                  <div>
                    <span className='py-3 d-flex gp-10'>
                      <LuMapPin style={{ fontSize: '14px' }} />
                      <span className='font-p f-6' style={{ fontSize: '13px' }}>
                        {ve?.turf?.address}
                      </span>
                    </span>
                  </div>

                  <div className='d-flex gp-10'>
                    <span className='py-3' style={{ fontSize: '15px' }}>{sportIconMap[ve.game.name]}</span>
                    <span className='font-p f-6' style={{ fontSize: '14px', position: 'relative', bottom: 2 }}>
                      - {ve.maxPlayers - ve.players.length} Slots Left
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Play