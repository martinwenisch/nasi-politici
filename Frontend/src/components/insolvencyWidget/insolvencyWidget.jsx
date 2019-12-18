import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import NoData from '../../components/emptyStates/noData/noData'
import { ReactComponent as LinkBtn } from '../../assets/images/link.svg';
import { ReactComponent as ReportBtn } from '../../assets/images/report.svg';
import {createStructuredSelector} from 'reselect'
import {
  getPersonalInsolvency,
  getCompanyInsolvency,
} from '../../redux/selectors'

import styles from './insolvencyWidget.module.scss'


function InsolvencyRow({title, personalCount, companyCount}) {
  return (
    <div>
      <div className={styles.subtitleWrapper}>
        <h3 className={styles.subtitle}>je {title}</h3>
        <div className={styles.line} />
      </div>
      <div>
        <div className={styles.tableRow}>
          <div>jako fyzická osoba</div>
          <div>{personalCount}</div>
        </div>
        <div className={styles.tableRow}>
          <div>skrz právnickou osobu</div>
          <div>{companyCount}</div>
        </div>
      </div>
    </div>
  )
}

const InsolvencyWidget = ({personalInsolvency, companyInsolvency}) => {
  const insolvencyWidgetCustomClassNames = classnames(
    styles.widget,
    styles.widgetWithTable,
    styles.insolvency,
    !personalInsolvency && !companyInsolvency && styles.noData)

  return (
    <div className={insolvencyWidgetCustomClassNames}>
      <div className={styles.header}>
        <h2 className={styles.title}>Insolvence</h2>
        {!!personalInsolvency && !!companyInsolvency && <div className={styles.tags}>
          <div className={styles.tag}>
            <LinkBtn />
            <div className={styles.tagname}>
              <a href='https://www.hlidacstatu.cz/' rel="noopener noreferrer" target='_blank'>hlidacstatu.cz</a>
            </div>
          </div>
          <div className={styles.reportBtnWrapper}>
            <ReportBtn className={styles.reportBtn}/>
          </div>
        </div>}
      </div>
      {!personalInsolvency && !companyInsolvency && <NoData />}
      {!!personalInsolvency && !!companyInsolvency &&
        <React.Fragment>
          <InsolvencyRow title='věřitelem' personalCount={personalInsolvency.creditorCount} companyCount={companyInsolvency.creditorCount}/>
          <InsolvencyRow title='dlužníkem' personalCount={personalInsolvency.debtorCount} companyCount={companyInsolvency.debtorCount}/>
          <InsolvencyRow title='insolvenčním správcem' personalCount={personalInsolvency.bailiffCount} companyCount={companyInsolvency.bailiffCount}/>
        </React.Fragment>}
    </div>
  )
}

const mapStateToProps = createStructuredSelector(
  {
    personalInsolvency: getPersonalInsolvency,
    companyInsolvency: getCompanyInsolvency,
  }
)

export default connect(mapStateToProps)(InsolvencyWidget);