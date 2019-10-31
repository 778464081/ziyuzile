// KemuyiDlg.h : header file
//

#if !defined(AFX_KEMUYIDLG_H__3AB5126F_E960_4BBD_BEDB_EB6DCDD13ABC__INCLUDED_)
#define AFX_KEMUYIDLG_H__3AB5126F_E960_4BBD_BEDB_EB6DCDD13ABC__INCLUDED_

#if _MSC_VER > 1000
#pragma once
#endif // _MSC_VER > 1000

/////////////////////////////////////////////////////////////////////////////
// CKemuyiDlg dialog

class CKemuyiDlg : public CDialog
{
// Construction
public:
	CKemuyiDlg(CWnd* pParent = NULL);	// standard constructor

// Dialog Data
	//{{AFX_DATA(CKemuyiDlg)
	enum { IDD = IDD_KEMUYI_DIALOG };
		// NOTE: the ClassWizard will add data members here
	//}}AFX_DATA

	// ClassWizard generated virtual function overrides
	//{{AFX_VIRTUAL(CKemuyiDlg)
	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support
	//}}AFX_VIRTUAL

// Implementation
protected:
	HICON m_hIcon;

	// Generated message map functions
	//{{AFX_MSG(CKemuyiDlg)
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	afx_msg void OnButton1();
	afx_msg void OnChangeEdit1();
	afx_msg void OnCheck1();
	//}}AFX_MSG
	DECLARE_MESSAGE_MAP()
};

//{{AFX_INSERT_LOCATION}}
// Microsoft Visual C++ will insert additional declarations immediately before the previous line.

#endif // !defined(AFX_KEMUYIDLG_H__3AB5126F_E960_4BBD_BEDB_EB6DCDD13ABC__INCLUDED_)
